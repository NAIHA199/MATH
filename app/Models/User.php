<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the role display name
     */
    public function getRoleDisplayNameAttribute()
    {
        $roles = [
            'student' => 'Học Sinh',
            'teacher' => 'Giáo Viên',
            'parent' => 'Phụ Huynh',
        ];

        return $roles[$this->role] ?? $this->role;
    }

    /**
     * Check if user is a student
     */
    public function isStudent()
    {
        return $this->role === 'student';
    }

    /**
     * Check if user is a teacher
     */
    public function isTeacher()
    {
        return $this->role === 'teacher';
    }

    /**
     * Check if user is a parent
     */
    public function isParent()
    {
        return $this->role === 'parent';
    }
}